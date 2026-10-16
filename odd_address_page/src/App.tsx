import './App.css'

// Replace the image in public/ and edit this copy for your exercise.
const content = {
  image: `${import.meta.env.BASE_URL}phishing-icon.png`,
  imageAlt: '',
  heading: 'Hups!',
  message:
    'Tämä olisi voinut olla vaarallinen linkki, mutta onneksi se on osa harjoitusta. Näin voi käydä kelle vaan, muista ensi kerralla tarkistaa linkin osoite ennen kuin klikkaat sitä.',
  closing: 'Voit nyt sulkea tämän sivun.',
}

function App() {
  return (
    <main className="exercise">
      <img className="exercise-image" src={content.image} alt={content.imageAlt} width="640" height="360" />
      <h1>{content.heading}</h1>
      <p>{content.message}</p>
      <p className="closing">{content.closing}</p>
    </main>
  )
}

export default App
