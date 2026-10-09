import { NextRequest, NextResponse } from "next/server";
import { isAdminAuthed } from "@/lib/admin-auth";
import {
  normalizeProject,
  readProjects,
  saveUploadedImage,
  storageMode,
  writeProjects,
  type PortfolioProject,
} from "@/lib/project-store";

async function filesFrom(form: FormData, key: string) {
  return form
    .getAll(key)
    .filter((value): value is File => value instanceof File && value.size > 0);
}

export async function GET(request: NextRequest) {
  if (!(await isAdminAuthed(request))) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }
  const projects = await readProjects();
  return NextResponse.json({ success: true, storage: storageMode(), projects });
}

export async function POST(request: NextRequest) {
  if (!(await isAdminAuthed(request))) {
    return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const form = await request.formData();
    const projects = await readProjects();
    const existingId = String(form.get("id") || "");
    const existing = projects.find((project) => project.id === existingId);
    const id = existing?.id || `p${Date.now().toString(36)}`;

    const keepImages = JSON.parse(String(form.get("keepImages") || "[]")) as string[];
    const tags = String(form.get("tags") || "")
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);

    let cover = String(form.get("coverPath") || existing?.cover || "");
    const coverFile = form.get("cover");
    if (coverFile instanceof File && coverFile.size > 0) {
      cover = await saveUploadedImage(coverFile, id, "cover");
    }

    const imgs = keepImages.filter((item) => item.startsWith("/assets/"));
    const gallery = await filesFrom(form, "gallery");
    if (gallery.length > 12) throw new Error("Upload 12 gallery images at a time or fewer.");
    for (const [index, file] of gallery.entries()) {
      imgs.push(await saveUploadedImage(file, id, `gallery-${index + 1}`));
    }

    const next = normalizeProject(
      {
        n: String(form.get("name") || ""),
        c: String(form.get("category") || "web"),
        t: String(form.get("type") || "Web"),
        l: String(form.get("lede") || ""),
        d: String(form.get("description") || ""),
        s: tags,
        u: String(form.get("github") || ""),
        tone: String(form.get("tone") || "#9b6cff"),
        date: String(form.get("date") || ""),
        featured: Number(form.get("featured") || 0),
        imgs,
        cover: cover || imgs[0] || "",
      },
      id
    );

    const updated: PortfolioProject[] = existing
      ? projects.map((project) => (project.id === id ? next : project))
      : [next, ...projects];
    await writeProjects(updated);
    return NextResponse.json({
      success: true,
      project: next,
      storage: storageMode(),
      message: existing ? "Project updated." : "Project added.",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not save the project.";
    return NextResponse.json({ success: false, error: message }, { status: 400 });
  }
}
