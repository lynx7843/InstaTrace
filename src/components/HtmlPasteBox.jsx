export default function HtmlPasteBox({ label, value, onChange, placeholder }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="uppercase tracking-wider font-bold text-sm">{label}</label>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="bg-black text-white border border-white p-3 h-32 focus:outline-none focus:ring-1 focus:ring-white resize-none font-mono text-xs"
      />
    </div>
  );
}