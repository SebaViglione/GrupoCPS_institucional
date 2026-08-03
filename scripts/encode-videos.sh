#!/usr/bin/env bash
# Re-encode de los videos del hero desde las fuentes HEVC.
# Genera por video: 1080p H.264 mp4 + 1080p AV1 webm + 720p H.264 mp4 + poster webp.
# Nombres versionados (-v2) para poder cachearlos como inmutables en Netlify.
set -euo pipefail

SRC_DIR="public/assets/videos/optimizados"
OUT_DIR="public/assets/videos"
POSTER_DIR="$OUT_DIR/posters"
mkdir -p "$OUT_DIR" "$POSTER_DIR"

for i in 1 2 3 4 5; do
  src="$SRC_DIR/Video${i}_1080p.mp4"
  [ -f "$src" ] || { echo "falta $src, salto"; continue; }

  extra=()
  # Video1 es 4K real pese al nombre; Video2 viene a 50fps
  [ "$i" = "1" ] && extra+=(-vf "scale=1920:-2")
  [ "$i" = "2" ] && extra+=(-r 25)

  echo "== Video $i: h264 1080p =="
  ffmpeg -hide_banner -loglevel error -y -i "$src" "${extra[@]}" -an \
    -c:v libx264 -preset slow -crf 24 -profile:v high -level 4.0 \
    -pix_fmt yuv420p -maxrate 3M -bufsize 6M -movflags +faststart \
    "$OUT_DIR/video${i}-v2.mp4"

  echo "== Video $i: av1 webm =="
  ffmpeg -hide_banner -loglevel error -y -i "$src" "${extra[@]}" -an \
    -c:v libsvtav1 -crf 38 -preset 6 -g 240 -svtav1-params tune=0 \
    "$OUT_DIR/video${i}-v2.webm"

  echo "== Video $i: h264 720p =="
  ffmpeg -hide_banner -loglevel error -y -i "$src" -vf "scale=1280:-2" -an \
    -c:v libx264 -preset slow -crf 26 -profile:v high -level 4.0 \
    -pix_fmt yuv420p -maxrate 1500k -bufsize 3M -movflags +faststart \
    "$OUT_DIR/video${i}-720-v2.mp4"

  echo "== Video $i: poster =="
  ffmpeg -hide_banner -loglevel error -y -ss 1 -i "$OUT_DIR/video${i}-v2.mp4" \
    -frames:v 1 -vf "scale=1920:-2" -c:v libwebp -quality 70 \
    "$POSTER_DIR/poster-video${i}.webp"
done

echo "Listo:"
ls -lh "$OUT_DIR"/*.mp4 "$OUT_DIR"/*.webm "$POSTER_DIR" 2>/dev/null
