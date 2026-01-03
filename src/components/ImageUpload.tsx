import { Upload } from "lucide-react";

interface ImageUploadProps {
  assignImage: (image: string) => void
}

function ImageUpload({ assignImage }: ImageUploadProps) {

  const handleContactImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return

    const file = files[0]

    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && typeof event.target.result === "string") {
          assignImage(event.target.result) 
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
      <Upload className="h-4 w-4 mr-1" />
      Subir Imagen
      <input
        type="file"
        accept="image/*"
        onChange={handleContactImageUpload}
        className="hidden"
      />
    </label>
  );
}

export default ImageUpload;
