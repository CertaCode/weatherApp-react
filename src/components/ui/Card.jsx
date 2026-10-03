export default function Card({
  title,
  date,
  CardTitleComponent,
  children,
  ...props
}) {
  return (
    <section className="card" {...props}>
      <div className="card-title">
        {title && <p>{title}</p>}
        {date && <p>{date}</p>}
        {CardTitleComponent && <CardTitleComponent />}
      </div>
      <div className="card-content">{children}</div>
    </section>
  );
}
