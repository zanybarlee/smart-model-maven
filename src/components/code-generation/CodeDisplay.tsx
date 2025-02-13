
interface CodeDisplayProps {
  code: string;
  title: string;
}

export const CodeDisplay = ({ code, title }: CodeDisplayProps) => {
  if (!code) return null;

  return (
    <div className="mt-6">
      <h3 className="font-semibold mb-2">{title}</h3>
      <div className="bg-slate-900 text-slate-50 p-4 rounded-lg">
        <pre className="whitespace-pre-wrap">{code}</pre>
      </div>
    </div>
  );
};
