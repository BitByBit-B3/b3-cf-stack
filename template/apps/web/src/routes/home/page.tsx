import { Badge } from '@repo/ui/badge'
import { Button } from '@repo/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@repo/ui/card'
import { useQuery } from '@tanstack/react-query'
import { client, unwrap } from '../../lib/rpc'

function useHello() {
  return useQuery({
    queryKey: ['hello'],
    queryFn: () => unwrap(client.hello.$get()),
  })
}

export function HomePage() {
  const hello = useHello()

  return (
    <div className="min-h-dvh flex flex-col items-center justify-center p-8 gap-8">
      <div className="flex flex-col items-center gap-2">
        <h1 className="text-4xl font-bold tracking-tight">create-b3-cf-app</h1>
        <p className="text-muted-foreground text-center max-w-md">
          Bun + Hono + Cloudflare Workers + React + Tailwind v4 — scaffolded in seconds.
        </p>
      </div>

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>API Health</CardTitle>
          <CardDescription>Response from your Hono Worker</CardDescription>
        </CardHeader>
        <CardContent>
          {hello.isLoading && <p className="text-sm text-muted-foreground">Checking API...</p>}
          {hello.isError && (
            <div className="flex flex-col gap-2">
              <Badge variant="destructive">API unreachable</Badge>
              <p className="text-sm text-muted-foreground">
                Make sure your worker is running (<code>bun run cf:dev</code>)
              </p>
            </div>
          )}
          {hello.data && (
            <div className="flex flex-col gap-2">
              <Badge variant="secondary">Connected</Badge>
              <p className="text-sm font-medium">{(hello.data as any).message}</p>
              <p className="text-xs text-muted-foreground">
                User: {(hello.data as any).user}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <div className="flex gap-3">
        <Button
          variant="outline"
          onClick={() => window.open('https://github.com/BitByBit-B3/create-b3-cf-app', '_blank')}
        >
          GitHub
        </Button>
        <Button onClick={() => hello.refetch()}>Refresh</Button>
      </div>
    </div>
  )
}
