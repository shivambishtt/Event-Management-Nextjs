function EventTags({ tags }: { tags: string[] }) {
  return (
    <div className="mt-2">
      <h2 className="text-2xl font-semibold">Tags</h2>
      <ul className="flex items-center list-none gap-6">
        {tags.map((tag, id) => {
          return <li className="bg-gray-900 text-md h-10 w-auto rounded mt-2" key={id}>{tag}</li>;
        })}
      </ul>
    </div>
  );
}
export default EventTags;
