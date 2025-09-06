import { useState, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Upload, X, File, Image, CheckCircle, Folder } from 'lucide-react';
import styles from './Upload.module.css';

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  uploaded: boolean;
}

export const UploadPage = () => {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const [directory, setDirectory] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    processFiles(droppedFiles);
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    processFiles(selectedFiles);
  }, []);

  const processFiles = (newFiles: File[]) => {
    const processedFiles: UploadedFile[] = newFiles.map(file => ({
      id: crypto.randomUUID(),
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file),
      uploaded: false
    }));

    setFiles(prev => [...prev, ...processedFiles]);
    
    // Start uploading each file
    newFiles.forEach((file, index) => {
      uploadFile(file, processedFiles[index].id);
    });
  };

  const uploadFile = async (file: File, fileId: string) => {
    try {
      // Create file path with directory if specified
      const sanitizedDirectory = directory.trim().replace(/[^a-zA-Z0-9\-_\/]/g, '');
      const directoryPath = sanitizedDirectory ? `${sanitizedDirectory}/` : '';
      const fileName = `${directoryPath}${Date.now()}-${file.name}`;
      
      // Simulate progress for better UX
      setUploadProgress(prev => ({ ...prev, [fileId]: 0 }));
      
      const progressInterval = setInterval(() => {
        setUploadProgress(prev => {
          const current = prev[fileId] || 0;
          if (current < 90) {
            return { ...prev, [fileId]: current + 10 };
          }
          return prev;
        });
      }, 200);
      
      const { data, error } = await supabase.storage
        .from('uploads')
        .upload(fileName, file);

      clearInterval(progressInterval);
      setUploadProgress(prev => ({ ...prev, [fileId]: 100 }));

      if (error) throw error;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('uploads')
        .getPublicUrl(fileName);

      setFiles(prev => prev.map(f => 
        f.id === fileId 
          ? { ...f, uploaded: true, url: publicUrl }
          : f
      ));

      toast({
        title: "Upload concluído",
        description: `${file.name} foi enviado${directoryPath ? ` para ${sanitizedDirectory}` : ''} com sucesso!`,
      });

    } catch (error) {
      console.error('Upload error:', error);
      toast({
        title: "Erro no upload",
        description: `Falha ao enviar ${file.name}`,
        variant: "destructive",
      });
    }
  };

  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
    setUploadProgress(prev => {
      const { [fileId]: removed, ...rest } = prev;
      return rest;
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) {
      return <Image className={styles.fileIcon} />;
    }
    return <File className={styles.fileIconGeneric} />;
  };

  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.pageTitle}>Upload de Arquivos</h1>
        
        {/* Directory Input */}
        <Card className={styles.directoryCard}>
          <CardHeader>
            <CardTitle className={styles.directoryHeader}>
              <Folder className="h-5 w-5" />
              Diretório de Destino
            </CardTitle>
          </CardHeader>
          <CardContent className={styles.directoryContent}>
            <div className={styles.directoryForm}>
              <Label htmlFor="directory">Nome da pasta (opcional)</Label>
              <Input
                id="directory"
                placeholder="ex: figuras, documentos, imagens/perfil"
                value={directory}
                onChange={(e) => setDirectory(e.target.value)}
                className={styles.directoryInput}
              />
              <p className={styles.directoryHelp}>
                Os arquivos serão salvos em: <code className={styles.directoryCode}>
                  uploads/{directory || 'raiz'}/
                </code>
              </p>
            </div>
          </CardContent>
        </Card>
        
        {/* Drop Zone */}
        <Card className={styles.uploadCard}>
          <CardContent className={styles.uploadContent}>
            <div
              className={`${styles.dropZone} ${
                isDragging ? styles.active : styles.inactive
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <Upload className={styles.uploadIcon} />
              <h3 className={styles.uploadTitle}>
                Arraste seus arquivos aqui
              </h3>
              <p className={styles.uploadDescription}>
                ou clique para selecionar arquivos
              </p>
              <Button 
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
              >
                Selecionar Arquivos
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                className={styles.hiddenInput}
                onChange={handleFileSelect}
                accept="image/*,application/pdf,.doc,.docx,.txt"
              />
            </div>
          </CardContent>
        </Card>

        {/* Files List */}
        {files.length > 0 && (
          <Card className={styles.filesCard}>
            <CardHeader className={styles.filesHeader}>
              <CardTitle>Arquivos ({files.length})</CardTitle>
            </CardHeader>
            <CardContent className={styles.filesContent}>
              <div className={styles.filesList}>
                {files.map((file) => (
                  <div key={file.id} className={styles.fileItem}>
                    {getFileIcon(file.type)}
                    
                    <div className={styles.fileInfo}>
                      <div className={styles.fileHeader}>
                        <p className={styles.fileName}>{file.name}</p>
                        {file.uploaded && (
                          <CheckCircle className={styles.successIcon} />
                        )}
                      </div>
                      <p className={styles.fileSize}>
                        {formatFileSize(file.size)}
                      </p>
                      
                      {!file.uploaded && uploadProgress[file.id] !== undefined && (
                        <div className={styles.progressContainer}>
                          <Progress value={uploadProgress[file.id]} className={styles.progressBar} />
                          <p className={styles.progressText}>
                            {Math.round(uploadProgress[file.id])}% enviado
                          </p>
                        </div>
                      )}
                    </div>

                    {file.type.startsWith('image/') && (
                      <img 
                        src={file.url} 
                        alt={file.name}
                        className={styles.filePreview}
                      />
                    )}

                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFile(file.id)}
                      className={styles.removeButton}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};