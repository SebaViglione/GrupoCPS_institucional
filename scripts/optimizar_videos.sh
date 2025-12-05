#!/bin/bash
# ==========================================
# OPTIMIZADOR RÁPIDO DE VIDEOS WEB (GRUPO CPS)
# Genera versiones 1080p y 720p en WebM + MP4
# y un poster .webp para cada video
# ✅ Procesa todos los videos en paralelo
# ✅ Usa todos los núcleos disponibles
# ==========================================

INPUT_DIR="assets/videos"
OUTPUT_DIR="assets/videos/optimizados"
THREADS=$(nproc)  # Detecta núcleos automáticamente

mkdir -p "$OUTPUT_DIR"

# Función que procesa un solo video
convertir_video() {
  local i=$1
  local INPUT_FILE="$INPUT_DIR/Video $i.mp4"

  if [ ! -f "$INPUT_FILE" ]; then
    echo "⚠️  Archivo no encontrado: $INPUT_FILE"
    return
  fi

  local BASENAME="Video$i"
  echo "🎬 Procesando $BASENAME con $THREADS hilos..."

  # WEBM 1080p (VP9 rápido)
  ffmpeg -y -threads "$THREADS" -i "$INPUT_FILE" \
    -c:v libvpx-vp9 -b:v 0 -crf 30 -cpu-used 4 -row-mt 1 -tile-columns 2 \
    -c:a libopus "$OUTPUT_DIR/${BASENAME}_1080p.webm" >/dev/null 2>&1 &

  # WEBM 720p
  ffmpeg -y -threads "$THREADS" -i "$INPUT_FILE" \
    -c:v libvpx-vp9 -b:v 0 -crf 33 -vf scale=1280:-1 \
    -cpu-used 4 -row-mt 1 -tile-columns 2 -c:a libopus \
    "$OUTPUT_DIR/${BASENAME}_720p.webm" >/dev/null 2>&1 &

  # MP4 1080p (H.265 rápido)
  ffmpeg -y -threads "$THREADS" -i "$INPUT_FILE" \
    -c:v libx265 -preset fast -crf 28 -tag:v hvc1 -c:a aac \
    "$OUTPUT_DIR/${BASENAME}_1080p.mp4" >/dev/null 2>&1 &

  # MP4 720p
  ffmpeg -y -threads "$THREADS" -i "$INPUT_FILE" \
    -vf scale=1280:-1 -c:v libx265 -preset fast -crf 30 -tag:v hvc1 -c:a aac \
    "$OUTPUT_DIR/${BASENAME}_720p.mp4" >/dev/null 2>&1 &

  # Poster .webp (frame en el segundo 1)
  ffmpeg -y -threads "$THREADS" -i "$INPUT_FILE" -ss 00:00:01 -vframes 1 \
    -q:v 70 "$OUTPUT_DIR/${BASENAME}_preview.webp" >/dev/null 2>&1

  echo "✅ $BASENAME listo."
}

# Procesa los 5 videos en paralelo
for i in {1..5}; do
  convertir_video "$i" &
done

# Espera a que todos terminen
wait
echo "🚀 Todos los videos procesados correctamente en paralelo."

