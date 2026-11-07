#!/usr/bin/env bash
# Submit every URL in the live sitemap to IndexNow (Bing, Yandex, etc).
# Run only after the site is deployed with the key file live at the keyLocation.
set -euo pipefail
HOST=holosearthacademy.org
KEY=6db86913212e441195bdbd2c6476734d
SITEMAP="https://$HOST/sitemap.xml"
# Refuse to ping until the deployed site serves the key file and a non-empty sitemap.
if [ "$(curl -s "https://$HOST/$KEY.txt")" != "$KEY" ]; then
  echo "Key file https://$HOST/$KEY.txt is not live yet. Wait for the deploy, then run again." >&2
  exit 1
fi
if ! curl -s "$SITEMAP" | grep -q '<loc>'; then
  echo "Sitemap $SITEMAP is empty or missing. Wait for the deploy, then run again." >&2
  exit 1
fi
URLS=$(curl -s "$SITEMAP" | grep -o '<loc>[^<]*</loc>' | sed -e 's/<loc>//' -e 's/<\/loc>//' | python3 -c 'import sys,json; print(json.dumps([l.strip() for l in sys.stdin if l.strip()]))')
echo "Submitting $(echo "$URLS" | python3 -c 'import sys,json; print(len(json.load(sys.stdin)))') URLs to IndexNow"
curl -sS -i -X POST https://api.indexnow.org/indexnow \
  -H 'Content-Type: application/json; charset=utf-8' \
  -d "{\"host\":\"$HOST\",\"key\":\"$KEY\",\"keyLocation\":\"https://$HOST/$KEY.txt\",\"urlList\":$URLS}"
