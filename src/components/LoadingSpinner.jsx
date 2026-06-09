export default function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-10">
      <div className="w-8 h-8 border-4 border-zinc-700 border-t-green-500 rounded-full animate-spin"></div>
    </div>
  );
}