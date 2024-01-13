import { IsTeacher } from "./_components/isTeacher";

export default function TeacherPage({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <IsTeacher>{children}</IsTeacher>
    </>
  );
}
