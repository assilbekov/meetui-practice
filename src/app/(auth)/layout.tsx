export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-muted flex min-h-svh flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-sm md:max-w-3xl mx-auto">{children}</div>
    </div>
  );
}
