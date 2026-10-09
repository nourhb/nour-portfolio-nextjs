import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthed } from "@/lib/admin-auth";
import { readProjects, storageMode, writeProjects } from "@/lib/project-store";

type Context = { params: Promise<{ id: string }> };

export async function DELETE(request: NextRequest, context: Context) {
  if (!(await isAdminAuthed(request))) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const projects = await readProjects();
  const next = projects.filter((project) => project.id !== id);
  if (next.length === projects.length) {
    return NextResponse.json({ success: false, error: "Project not found." }, { status: 404 });
  }
  await writeProjects(next);
  return NextResponse.json({ success: true, storage: storageMode() });
}
