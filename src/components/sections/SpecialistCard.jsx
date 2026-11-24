import PropTypes from 'prop-types'

import Card from '../ui/Card'

export default function SpecialistCard({person}) {
  return (
    <Card as="article" className="flex h-full flex-col overflow-hidden">
      <img src={person.image} alt={`صورة تعبيرية للأخصائي ${person.name}`} width="400" height="400" loading="lazy" decoding="async" className="aspect-square w-full object-cover" />
      <div className="flex flex-1 flex-col p-7">
        <h3 className="text-xl text-content">{person.name}</h3>
        <p className="mt-1 text-sm font-medium text-accent-text">{person.role}</p>
        <p className="mt-4 flex-1 leading-8 text-content-muted">{person.bio}</p>
        <ul className="mt-6 flex flex-wrap gap-2" aria-label="مجالات الاهتمام">
          {person.focus.map((f) => (
            <li key={f} className="rounded-full bg-primary-soft px-3 py-1 text-xs text-primary">{f}</li>
          ))}
        </ul>
        <p className="mt-5 text-sm text-content-muted">الفئة: {person.audience}</p>
      </div>
    </Card>
  )
}

SpecialistCard.propTypes = {person: PropTypes.object.isRequired}
