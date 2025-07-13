# Implementação do Backend para Upload em Chunks

## Endpoints Necessários

### 1. Inicialização do Upload (`/artists/musics/init`)

```typescript
// POST /artists/musics/init
interface InitUploadRequest {
  fileId: string;
  audioFileName: string;
  audioFileSize: number;
  audioTotalChunks: number;
  coverFileName?: string;
  coverFileSize?: number;
  coverTotalChunks?: number;
  title: string;
  description: string;
  category_id: string;
  music_id?: string;
}

interface InitUploadResponse {
  fileId: string;
  status: "initialized";
  uploadUrls: {
    audio: string;
    cover?: string;
  };
}
```

### 2. Upload de Chunk (`/artists/musics/audio-chunk` e `/artists/musics/cover-chunk`)

```typescript
// POST /artists/musics/audio-chunk
// POST /artists/musics/cover-chunk
interface ChunkUploadRequest {
  chunk: File; // Multipart form data
  chunkNumber: number;
  totalChunks: number;
  fileId: string;
  fileType: "audio" | "cover";
}

interface ChunkUploadResponse {
  chunkNumber: number;
  status: "uploaded";
  fileId: string;
}
```

### 3. Finalização do Upload (`/artists/musics/complete`)

```typescript
// POST /artists/musics/complete
interface CompleteUploadRequest {
  fileId: string;
  title: string;
  description: string;
  category_id: string;
  music_id?: string;
}

interface CompleteUploadResponse {
  music: {
    id: string;
    title: string;
    description: string;
    cover: string;
    audio_url: string;
    // ... outros campos
  };
}
```

## Implementação no Backend

### Exemplo em Node.js/Express

```javascript
const multer = require("multer");
const fs = require("fs");
const path = require("path");

// Armazenamento temporário para chunks
const chunkStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const fileId = req.body.fileId;
    const chunkDir = path.join(__dirname, "temp", fileId);
    if (!fs.existsSync(chunkDir)) {
      fs.mkdirSync(chunkDir, { recursive: true });
    }
    cb(null, chunkDir);
  },
  filename: (req, file, cb) => {
    const chunkNumber = req.body.chunkNumber;
    cb(null, `chunk_${chunkNumber}`);
  },
});

const uploadChunk = multer({ storage: chunkStorage });

// Inicializar upload
app.post("/artists/musics/init", async (req, res) => {
  try {
    const { fileId, audioFileName, audioFileSize, audioTotalChunks } = req.body;

    // Criar diretório temporário
    const tempDir = path.join(__dirname, "temp", fileId);
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    // Salvar metadados
    const metadata = {
      fileId,
      audioFileName,
      audioFileSize,
      audioTotalChunks,
      coverFileName: req.body.coverFileName,
      coverFileSize: req.body.coverFileSize,
      coverTotalChunks: req.body.coverTotalChunks,
      title: req.body.title,
      description: req.body.description,
      category_id: req.body.category_id,
      music_id: req.body.music_id,
      createdAt: new Date(),
    };

    fs.writeFileSync(
      path.join(tempDir, "metadata.json"),
      JSON.stringify(metadata)
    );

    res.json({
      fileId,
      status: "initialized",
      uploadUrls: {
        audio: `/artists/musics/audio-chunk`,
        cover: req.body.coverFileName
          ? `/artists/musics/cover-chunk`
          : undefined,
      },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Upload de chunk de áudio
app.post(
  "/artists/musics/audio-chunk",
  uploadChunk.single("chunk"),
  async (req, res) => {
    try {
      const { fileId, chunkNumber, totalChunks } = req.body;

      // Verificar se o chunk foi salvo
      const chunkPath = path.join(
        __dirname,
        "temp",
        fileId,
        `chunk_${chunkNumber}`
      );
      if (!fs.existsSync(chunkPath)) {
        return res.status(400).json({ error: "Chunk not saved" });
      }

      res.json({
        chunkNumber: parseInt(chunkNumber),
        status: "uploaded",
        fileId,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Upload de chunk de capa
app.post(
  "/artists/musics/cover-chunk",
  uploadChunk.single("chunk"),
  async (req, res) => {
    try {
      const { fileId, chunkNumber, totalChunks } = req.body;

      // Verificar se o chunk foi salvo
      const chunkPath = path.join(
        __dirname,
        "temp",
        fileId,
        `chunk_${chunkNumber}`
      );
      if (!fs.existsSync(chunkPath)) {
        return res.status(400).json({ error: "Chunk not saved" });
      }

      res.json({
        chunkNumber: parseInt(chunkNumber),
        status: "uploaded",
        fileId,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Finalizar upload
app.post("/artists/musics/complete", async (req, res) => {
  try {
    const { fileId } = req.body;
    const tempDir = path.join(__dirname, "temp", fileId);

    // Ler metadados
    const metadataPath = path.join(tempDir, "metadata.json");
    if (!fs.existsSync(metadataPath)) {
      return res.status(400).json({ error: "Upload not initialized" });
    }

    const metadata = JSON.parse(fs.readFileSync(metadataPath, "utf8"));

    // Combinar chunks do áudio
    const audioChunks = [];
    for (let i = 0; i < metadata.audioTotalChunks; i++) {
      const chunkPath = path.join(tempDir, `chunk_${i}`);
      if (fs.existsSync(chunkPath)) {
        audioChunks.push(fs.readFileSync(chunkPath));
      }
    }

    const audioBuffer = Buffer.concat(audioChunks);

    // Combinar chunks da capa (se existir)
    let coverBuffer = null;
    if (metadata.coverFileName) {
      const coverChunks = [];
      for (let i = 0; i < metadata.coverTotalChunks; i++) {
        const chunkPath = path.join(tempDir, `cover_chunk_${i}`);
        if (fs.existsSync(chunkPath)) {
          coverChunks.push(fs.readFileSync(chunkPath));
        }
      }
      coverBuffer = Buffer.concat(coverChunks);
    }

    // Salvar arquivos finais (exemplo com AWS S3)
    const audioUrl = await uploadToS3(
      audioBuffer,
      `musics/${fileId}/audio.mp3`
    );
    const coverUrl = coverBuffer
      ? await uploadToS3(coverBuffer, `musics/${fileId}/cover.jpg`)
      : null;

    // Salvar no banco de dados
    const music = await saveMusicToDatabase({
      title: metadata.title,
      description: metadata.description,
      category_id: metadata.category_id,
      audio_url: audioUrl,
      cover: coverUrl,
      music_id: metadata.music_id,
    });

    // Limpar arquivos temporários
    fs.rmSync(tempDir, { recursive: true, force: true });

    res.json({ music });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Função auxiliar para upload no S3
async function uploadToS3(buffer: Buffer, key: string): Promise<string> {
  // Implementar upload para S3 ou outro serviço de armazenamento
  // Retornar URL do arquivo
  return `https://your-bucket.s3.amazonaws.com/${key}`;
}

// Função auxiliar para salvar no banco
async function saveMusicToDatabase(musicData: any) {
  // Implementar salvamento no banco de dados
  return {
    id: "generated-id",
    ...musicData,
  };
}
```

## Vantagens do Upload em Chunks

1. **Resistência a falhas**: Se um chunk falhar, apenas ele precisa ser reenviado
2. **Melhor experiência do usuário**: Progresso visual em tempo real
3. **Suporte a arquivos grandes**: Não há limite de tamanho do navegador
4. **Otimização de rede**: Chunks menores são mais eficientes
5. **Retomada de upload**: Possibilidade de continuar uploads interrompidos

## Configurações Recomendadas

- **Tamanho do chunk**: 512KB - 1MB (equilibra performance e overhead)
- **Timeout**: 30 segundos por chunk
- **Retry**: 3 tentativas por chunk
- **Limpeza**: Remover arquivos temporários após 24 horas
