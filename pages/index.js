import useSWR from "swr";
import Link from "next/link";

export default function HomePage() {
  const { data, isLoading } = useSWR("/api");

  if (isLoading) {
    return <h1>Loading ...</h1>;
  }

  if (!data) {
    return;
  }

  return (
    <>
      <h1>Activities</h1>
    <ul>
      {data.map((activity) => (
        <li key={activity._id}>
          <Link href={`activity._id}`}>{activity.title}</Link>
        </li>
      ))}
    </ul>
    </>
  );
}
