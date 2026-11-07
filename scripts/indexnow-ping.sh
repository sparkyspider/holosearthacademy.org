#!/usr/bin/env bash
# Submit every URL in the live sitemap to IndexNow (Bing, Yandex, etc).
# Run only after the site is deployed with the key file live at the keyLocation.
set -euo pipefail
HOST=holosearthacademy.org
KEY=6db86913212e441195bdbd2c6476734d
SITEMAP="https://$HOST/sitemap.xml"
URLS=$(curl -s "$SITEMAP" | grep -o '<loc>[^<]*</loc>' | sed -e 's/<loc>//' -e 's/<\/loc>//' | python3 -c 'import sys,json; print(json.dumps([l.strip() for l in sys.stdin if l.strip()]))')
curl -sS -i -X POST https://api.indexnow.org/indexnow \
  -H 'Content-Type: application/json; charset=utf-8' \
  -d "{\"host\":\"$HOST\",\"key\":\"$KEY\",\"keyLocation\":\"https://$HOST/$KEY.txt\",\"urlList\":$URLS}"
