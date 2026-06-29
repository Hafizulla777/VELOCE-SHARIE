const SkeletonCard = () => (
  <div className="rounded-3xl border border-white/10 bg-white/[0.02] overflow-hidden h-[480px]">
    <div className="h-56 shimmer"></div>
    <div className="p-6 space-y-4">
      <div className="h-6 w-3/4 rounded-lg shimmer"></div>
      <div className="h-4 w-1/2 rounded-lg shimmer"></div>
      <div className="grid grid-cols-3 gap-2 pt-4">
        <div className="h-10 rounded-lg shimmer"></div>
        <div className="h-10 rounded-lg shimmer"></div>
        <div className="h-10 rounded-lg shimmer"></div>
      </div>
      <div className="h-12 rounded-xl shimmer mt-4"></div>
    </div>
  </div>
);

export default SkeletonCard;