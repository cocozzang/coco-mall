"use client"

import { Command, CommandInput } from "../ui/command"

interface SearchBarProps {}

export default function SearchBar({}: SearchBarProps) {
  return (
    <Command className="max-w-[500px] shadow-md">
      <CommandInput placeholder="검색어를 입력하세요..." />
    </Command>
  )
}
