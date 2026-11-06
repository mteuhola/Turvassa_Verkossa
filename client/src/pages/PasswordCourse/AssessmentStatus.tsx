export default function AssessmentStatus({
  loading,
  error,
  retry,
}: {
  loading: boolean;
  error: boolean;
  retry: () => void;
}) {
  if (loading) return <p>Arvioidaan salasanaa…</p>;
  if (!error) return null;
  return (
    <div>
      <p>Salasanan arviointi ei onnistunut häiriöstä johtuen. Yritä uudelleen.</p>
      <button type="button" onClick={retry}>
        Yritä uudelleen
      </button>
    </div>
  );
}
