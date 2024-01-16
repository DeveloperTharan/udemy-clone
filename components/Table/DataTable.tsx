"use client";

import React, { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

import { Course } from "@prisma/client";

import {
  DeleteIcon,
  EditIcon,
  EyeIcon,
  PlusIcon,
  SearchIcon,
  Trash,
  Trash2,
} from "lucide-react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  Chip,
  Pagination,
  Selection,
  SortDescriptor,
  Tooltip,
} from "@nextui-org/react";

interface DataTableProps {
  courseData: Course[];
  categoryData: { key: string; value: string }[];
}

export const DataTable = ({ courseData, categoryData }: DataTableProps) => {
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set([]));
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "title",
    direction: "ascending",
  });

  const router = useRouter();

  const hasSearchFilter = Boolean(filterValue);

  const categoryFilter = (categoryId: string) => {
    const res = categoryData.find((category) => category.key === categoryId);

    return res?.value;
  };

  const filteredItems = useMemo(() => {
    let filteredUsers = [...courseData];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((course) =>
        course.title.toLowerCase().includes(filterValue.toLowerCase())
      );
    }

    return filteredUsers;
  }, [courseData, filterValue, hasSearchFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a: Course, b: Course) => {
      const first = a[sortDescriptor.column as keyof Course] as number;
      const second = b[sortDescriptor.column as keyof Course] as number;
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const onNextPage = React.useCallback(() => {
    if (page < pages) {
      setPage(page + 1);
    }
  }, [page, pages]);

  const onPreviousPage = React.useCallback(() => {
    if (page > 1) {
      setPage(page - 1);
    }
  }, [page]);

  const onRowsPerPageChange = React.useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      setRowsPerPage(Number(e.target.value));
      setPage(1);
    },
    []
  );

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const topContent = useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<SearchIcon size={16} />}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
            size="sm"
            radius="full"
          />
          <Button
            color="primary"
            endContent={<PlusIcon />}
            onClick={() => router.push("/teacher/create")}
            size="md"
          >
            create
          </Button>
        </div>
        <div className="flex justify-between items-center">
          <div className="text-default-400 text-small">
            Total {courseData.length} courses
          </div>
          <label className="flex items-center text-default-400 text-small">
            Rows per page:
            <select
              className="bg-transparent outline-none text-default-400 text-small"
              onChange={onRowsPerPageChange}
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="15">15</option>
            </select>
          </label>
        </div>
      </div>
    );
  }, [
    filterValue,
    onSearchChange,
    onRowsPerPageChange,
    courseData.length,
    hasSearchFilter,
    onClear,
    router,
  ]);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <div className="w-[30%] text-small text-default-400">
          {selectedKeys === "all"
            ? "All items selected"
            : `${selectedKeys.size} of ${filteredItems.length} selected`}
        </div>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <div className="hidden sm:flex w-[30%] justify-end gap-2">
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onPreviousPage}
          >
            Previous
          </Button>
          <Button
            isDisabled={pages === 1}
            size="sm"
            variant="flat"
            onPress={onNextPage}
          >
            Next
          </Button>
        </div>
      </div>
    );
  }, [
    selectedKeys,
    items.length,
    page,
    pages,
    hasSearchFilter,
    filteredItems.length,
  ]);

  return (
    <Table
      aria-label="Your course Data"
      isHeaderSticky
      bottomContent={bottomContent}
      bottomContentPlacement="outside"
      classNames={{
        wrapper: "max-h-[382px]",
      }}
      selectedKeys={selectedKeys}
      selectionMode="multiple"
      sortDescriptor={sortDescriptor}
      topContent={topContent}
      topContentPlacement="outside"
      onSelectionChange={setSelectedKeys}
      onSortChange={setSortDescriptor}
    >
      <TableHeader>
        <TableColumn key="title">TITLE</TableColumn>
        <TableColumn key="price">PRICE</TableColumn>
        <TableColumn key="categoryId">CATEGORY</TableColumn>
        <TableColumn key="status">STATUS</TableColumn>
        <TableColumn key="action">Action</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"No courses found"} items={sortedItems}>
        {(item) => (
          <TableRow key={item.id}>
            <TableCell>{item.title}</TableCell>
            <TableCell>{`$${item.price || ""}`}</TableCell>
            <TableCell>{categoryFilter(item.categoryId!)}</TableCell>
            <TableCell>
              <Chip
                className={cn(
                  item.isPublished
                    ? "bg-green-600/10 text-green-600"
                    : "bg-red-600/10 text-red-600"
                )}
              >
                {item.isPublished ? "Published" : "UnPubished"}
              </Chip>
            </TableCell>
            <TableCell className="w-28">
              <div className="relative flex items-center gap-4">
                <Tooltip content="Details">
                  <div className="w-full h-full text-default-400 cursor-pointer active:opacity-50">
                    <EyeIcon size={18} />
                  </div>
                </Tooltip>
                <Tooltip content="Edit course">
                  <div
                    className="w-full h-full text-blue-600 cursor-pointer active:opacity-50"
                    onClick={() => router.push(`/teacher/${item.id}`)}
                  >
                    <EditIcon size={18} />
                  </div>
                </Tooltip>
                <Tooltip color="danger" content="Delete course">
                  <div className="w-full h-full text-danger cursor-pointer active:opacity-50">
                    <Trash size={18} />
                  </div>
                </Tooltip>
              </div>
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
