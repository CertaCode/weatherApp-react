export default function Navbar() {
  return (
    <nav>
      <ul>
        <li className="active">
          <a href="/today">
            <p>Today</p>
          </a>
        </li>
        <li>
          <a href="/hourly">
            <p>Hourly</p>
          </a>
        </li>
        <li>
          <a href="/7days">
            <p>7-Days</p>
          </a>
        </li>
      </ul>
    </nav>
  );
}
