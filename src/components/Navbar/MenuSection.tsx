import Link from "next/link";

const items = [
  {
    title: "Cars",
    url: "/cars",
  },
  {
    title: "Blogs",
    url: "/blogs",
  },
  {
    title: "reviews",
    url: "/user-reviews",
  },
  {
    title: "Most Viewed",
    url: "/cars/most-viewed",
  },
];

export const MenuSection = () => {
  return (
    <div className="flex gap-8 px-4 text-black items-center justify-center text-2xl font-bold">
      {items.map((item) => (
        <Link key={item.title} href={item.url} >
          {item.title}
        </Link>
      ))}
    </div>
  );
};
