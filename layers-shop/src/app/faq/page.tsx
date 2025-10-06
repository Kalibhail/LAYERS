export default function FaqPage() {
  return (
    <div className="py-10 max-w-2xl">
      <h1 className="text-2xl font-semibold tracking-tight">FAQ</h1>
      <div className="mt-6 space-y-4 text-black/80">
        <div>
          <h2 className="font-medium">Shipping</h2>
          <p>Orders ship within 2-3 business days. Tracking provided when shipped.</p>
        </div>
        <div>
          <h2 className="font-medium">Returns</h2>
          <p>Unused items can be returned within 30 days. Contact support for an RMA.</p>
        </div>
      </div>
    </div>
  );
}
