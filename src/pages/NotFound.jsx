import Seo from '../components/common/Seo'
import Container from '../components/ui/Container'
import Section from '../components/ui/Section'
import Button from '../components/ui/Button'

export default function NotFound() {
  return (
    <>
      <Seo title="الصفحة غير موجودة | مساحة نفسية" description="لم نعثر على الصفحة التي تبحث عنها." path="/404" noindex />
      <Section>
        <Container narrow>
          <div className="text-center">
            <p className="text-6xl font-semibold text-primary" aria-hidden="true">٤٠٤</p>
            <h1 className="mt-6 text-3xl">لم نعثر على هذه الصفحة</h1>
            <p className="mt-4 leading-9 text-content-muted">قد يكون الرابط قد تغيّر. يمكنك العودة إلى الرئيسية أو تصفّح المقالات.</p>
            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
              <Button to="/" size="lg">الرئيسية</Button>
              <Button to="/resources" variant="outline" size="lg">المقالات</Button>
            </div>
          </div>
        </Container>
      </Section>
    </>
  )
}
