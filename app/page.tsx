import ImageGenerator from '../components/image-generator'
import ImageGrid from '../components/image-grid'

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">AI Image Generator</h1>
      <ImageGenerator />
    </main>
  )
}
