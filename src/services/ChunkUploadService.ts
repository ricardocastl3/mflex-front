import { AuSoftUI } from "@/@components/(ausoft)";
import { internalApi } from "@/http/axios/api";

class ChunkUploadService {
  validateFileSize({
    blob,
    maxMB,
    toast,
    titlePt,
    titleEn,
    descriptionPt,
    descriptionEn,
  }: {
    blob: Blob;
    maxMB: number;
    toast: any;
    titlePt: string;
    titleEn: string;
    descriptionPt: string;
    descriptionEn: string;
  }): boolean {
    const limitSize = maxMB * 1024 * 1024;
    if (blob.size > limitSize) {
      AuSoftUI.Component.ToastifyWithTranslation({
        description_en: descriptionEn,
        description_pt: descriptionPt,
        title_en: titleEn,
        title_pt: titlePt,
        toast,
        type: "error",
      });
      return false;
    }
    return true;
  }

  async uploadCreatorPostByChunks({
    file,
    fileId,
    type,
    postId,
    chunkSizeMB = 3,
  }: {
    file: Blob;
    fileId: string;
    type: "image" | "reel";
    postId: string;
    chunkSizeMB?: number;
  }): Promise<{ success: boolean; url?: string }> {
    const chunkSize = chunkSizeMB * 1024 * 1024;
    const totalChunks = Math.ceil(file.size / chunkSize);

    for (let i = 0; i < totalChunks; i++) {
      const start = i * chunkSize;
      const end = Math.min(start + chunkSize, file.size);
      const chunk = file.slice(start, end);

      const formData = new FormData();
      formData.append("chunk", chunk);
      formData.append("chunkIndex", String(i));
      formData.append("fileId", fileId);
      formData.append("type", type); // "cover" ou "sound"

      await internalApi.postForm("/creators/uploads/chunk-init", formData);
    }

    // Depois de enviar todos os chunks, solicita o merge
    await internalApi.post("/creators/uploads/chunk-merge", {
      fileId,
      type,
      post_id: postId,
    });

    return { success: true };
  }

  async uploadMusicByChunks({
    file,
    fileId,
    type,
    musicId,
    chunkSizeMB = 3,
  }: {
    file: Blob;
    fileId: string;
    type: "cover" | "sound";
    musicId: string;
    chunkSizeMB?: number;
  }): Promise<{ success: boolean; url?: string }> {
    const chunkSize = chunkSizeMB * 1024 * 1024;
    const totalChunks = Math.ceil(file.size / chunkSize);

    for (let i = 0; i < totalChunks; i++) {
      const start = i * chunkSize;
      const end = Math.min(start + chunkSize, file.size);
      const chunk = file.slice(start, end);

      const formData = new FormData();
      formData.append("chunk", chunk);
      formData.append("chunkIndex", String(i));
      formData.append("fileId", fileId);
      formData.append("type", type); // "cover" ou "sound"

      await internalApi.postForm("/artists/musics/chunk-init", formData);
    }

    // Depois de enviar todos os chunks, solicita o merge
    await internalApi.post("/artists/musics/chunk-merge", {
      fileId,
      type,
      music_id: musicId,
    });

    return { success: true };
  }
}

export default new ChunkUploadService();
