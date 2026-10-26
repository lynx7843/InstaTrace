import { Upload } from 'lucide-react';

export default function FileDropzone({ label, multiple, onFilesRead }) {
  const handleFileChange = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const readPromises = files.map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => resolve(event.target.result);
        reader.onerror = (error) => reject(error);
        reader.readAsText(file);
      });
    });

    try {
      const results = await Promise.all(readPromises);
      onFilesRead(multiple ? results : results[0]);
    } catch (error) {
      console.error("Error reading files:", error);
    }
  };

  return (
    <div className="border border-dashed border-white p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-white hover:text-black transition-colors group relative">
      <Upload size={24} className="mb-2" />
      <span className="font-bold uppercase tracking-wider">{label}</span>
      <span className="text-xs mt-1 opacity-70 group-hover:opacity-100">Click to upload .html</span>
      <input
        type="file"
        accept=".html"
        multiple={multiple}
        onChange={handleFileChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
    </div>
  );
}