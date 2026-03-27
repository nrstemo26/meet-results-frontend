import { useSelector } from 'react-redux'

const PRODUCTS = {
  creatine: {
    name: 'Creatine Monohydrate',
    desc: 'NSF Certified · clinically validated for power athletes',
    href: 'https://crrnt.app/MOME/g_L2dGDy',
    event: 'momentous-athlete-creatine',
  },
  athleteStack: {
    name: 'Athletic Stack',
    desc: 'Performance bundle for strength & conditioning',
    href: 'https://crrnt.app/MOME/6XD975Q3',
    event: 'momentous-athlete-stack',
  },
  femaleStack: {
    name: 'Complete Female Athlete Stack',
    desc: 'Formulated for female athletes',
    href: 'https://crrnt.app/MOME/l8e2Oao1',
    event: 'momentous-athlete-female-stack',
  },
  momentousThree: {
    name: 'The Momentous Three',
    desc: 'Protein, creatine & omega-3 — the core stack',
    href: 'https://crrnt.app/MOME/ww2lkgvd',
    event: 'momentous-athlete-three',
  },
}

function getProducts(gender) {
  if (gender === 'Female') return [PRODUCTS.femaleStack, PRODUCTS.creatine]
  if (gender === 'Male') return [PRODUCTS.athleteStack, PRODUCTS.creatine]
  return [PRODUCTS.momentousThree, PRODUCTS.creatine]
}

const MomentousAffiliate = () => {
  const { data } = useSelector((state) => state.athlete)
  const gender = data?.stats?.Gender
  const products = getProducts(gender)

  return (
    <div className="bg-secondary-500 p-6 rounded-lg shadow-lg flex flex-col gap-3 min-w-[200px]">
      <h2 className="text-center text-xl text-primary-950 font-bold border-b border-primary-100 pb-1">
        Fuel Your Training
      </h2>
      <p className="text-xs text-gray-500 text-center">14% off · discount auto-applied at checkout</p>
      {products.map((p) => (
        <a
          key={p.event}
          href={p.href}
          target="_blank"
          rel="noopener noreferrer"
          data-umami-event={p.event}
          className="block rounded-lg bg-primary-950 px-4 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-primary-800 transition-colors"
        >
          <div>{p.name}</div>
          <div className="text-xs font-normal text-gray-300 mt-0.5">{p.desc}</div>
        </a>
      ))}
      <p className="text-xs text-gray-400 text-center">
        Powered by{' '}
        <a
          href="https://crrnt.app/MOME/pmnbzWOY"
          target="_blank"
          rel="noopener noreferrer"
          data-umami-event="momentous-athlete-brand"
          className="underline"
        >
          Momentous
        </a>
      </p>
    </div>
  )
}

export default MomentousAffiliate
