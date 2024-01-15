import { headers } from 'next/headers'

export async function GET(request, { params }) {
  const headersList = headers()
  console.log(params.name)

  return new Response(`${params.name}`, {
    status: 200,
  })
}