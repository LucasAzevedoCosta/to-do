import { Skeleton } from "@/components/ui/skeleton"

export default function AuthLoading() {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        {/* Logo / brand */}
        <div className="flex items-center gap-2 self-center">
          <div className="flex size-6 items-center justify-center rounded-md">
            <Skeleton className="h-6 w-6 rounded-md" />
          </div>
          <Skeleton className="h-4 w-32" />
        </div>

        {/* Card */}
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="flex flex-col items-center gap-2 border-b px-6 py-6 text-center">
            <Skeleton className="h-5 w-40" /> {/* Title */}
            <Skeleton className="h-4 w-52" /> {/* Description */}
          </div>

          <div className="px-6 py-6">
            <div className="grid gap-6">
              {/* Botão social */}
              <Skeleton className="h-10 w-full" />

              {/* Divider */}
              <div className="relative text-center text-sm">
                <div className="absolute inset-0 top-1/2 -translate-y-1/2">
                  <Skeleton className="h-px w-full" />
                </div>
                <div className="relative mx-auto w-28 bg-card">
                  <Skeleton className="h-4 w-28" />
                </div>
              </div>

              {/* Campos (email / username / senha) */}
              <div className="grid gap-4">
                {/* label + input */}
                <div className="grid gap-2">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-10 w-full" />
                </div>

                {/* Campos extras (quando for signup) – mostramos skeletons também */}
                <div className="grid gap-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-10 w-full" />
                </div>

                <div className="grid gap-2">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>

              {/* Botão submit */}
              <Skeleton className="h-10 w-full" />
            </div>

            {/* Link de alternância (login <-> signup) */}
            <div className="mt-6 text-center">
              <Skeleton className="mx-auto h-4 w-48" />
            </div>
          </div>
        </div>

        {/* Termos / rodapé */}
        <div className="text-center">
          <Skeleton className="mx-auto h-3 w-72" />
        </div>
      </div>
    </div>
  )
}
