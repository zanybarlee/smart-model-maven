
interface CodeDisplayProps {
  code: string;
  title: string;
}

export const CodeDisplay = ({ code, title }: CodeDisplayProps) => {
  if (!code) return null;

  return (
    <div className="mt-4 md:mt-6">
      <h3 className="font-semibold mb-2 text-sm md:text-base">{title}</h3>
      <div className="bg-slate-900 text-slate-50 p-3 md:p-4 rounded-lg overflow-x-auto">
        <pre className="text-sm md:text-base font-mono whitespace-pre-wrap">{code}</pre>
      </div>
    </div>
  );
};
