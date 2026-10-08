import { NextRequest, NextResponse } from 'next/server';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const OWNER = 'nourhb';
const REPO = 'nour-portfolio-nextjs';
const BRANCH = 'main';

async function githubApi(path: string, method: string = 'GET', body?: any) {
  const res = await fetch(`https://api.github.com${path}`, {
    method,
    headers: {
      'Authorization': `Bearer ${GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });
  return res.json();
}

async function getFileSha(filePath: string): Promise<string | null> {
  try {
    const data = await githubApi(`/repos/${OWNER}/${REPO}/contents/${filePath}?ref=${BRANCH}`);
    return data.sha || null;
  } catch {
    return null;
  }
}

async function getProjectsJson() {
  const data = await githubApi(`/repos/${OWNER}/${REPO}/contents/src/data/projects.json?ref=${BRANCH}`);
  const content = Buffer.from(data.content, 'base64').toString('utf-8');
  return { projects: JSON.parse(content), sha: data.sha };
}

export async function POST(request: NextRequest) {
  try {
    if (!GITHUB_TOKEN) {
      return NextResponse.json({ success: false, error: 'GITHUB_TOKEN not configured' }, { status: 500 });
    }

    const formData = await request.formData();
    const name = formData.get('name') as string;
    const category = formData.get('category') as string;
    const description = formData.get('description') as string;
    const github = formData.get('github') as string;
    const techStr = formData.get('tech') as string;
    const tech = techStr.split(',').map(t => t.trim()).filter(Boolean);

    if (!name || !description) {
      return NextResponse.json({ success: false, error: 'Name and description required' }, { status: 400 });
    }

    // Get current projects
    const { projects, sha } = await getProjectsJson();
    const nextId = Math.max(...projects.map((p: any) => p.id), 0) + 1;

    // Upload cover image
    const coverFile = formData.get('cover') as File | null;
    let coverPath = `/images/project-${nextId}.webp`;
    
    if (coverFile && coverFile.size > 0) {
      const buffer = Buffer.from(await coverFile.arrayBuffer());
      const base64 = buffer.toString('base64');
      await githubApi(`/repos/${OWNER}/${REPO}/contents/public/images/project-${nextId}.webp`, 'PUT', {
        message: `Add cover for project ${nextId}`,
        content: base64,
        branch: BRANCH,
      });
    }

    // Upload gallery images
    const galleryPaths: string[] = [];
    let galleryIndex = 1;
    for (const [key, value] of formData.entries()) {
      if (key.startsWith('gallery_') && value instanceof File && value.size > 0) {
        const buffer = Buffer.from(await value.arrayBuffer());
        const base64 = buffer.toString('base64');
        const gPath = `public/images/galleries/project-${nextId}-g${galleryIndex}.webp`;
        await githubApi(`/repos/${OWNER}/${REPO}/contents/${gPath}`, 'PUT', {
          message: `Add gallery image ${galleryIndex} for project ${nextId}`,
          content: base64,
          branch: BRANCH,
        });
        galleryPaths.push(`/images/galleries/project-${nextId}-g${galleryIndex}.webp`);
        galleryIndex++;
      }
    }

    // Create new project (newest first)
    const newProject = {
      id: nextId,
      name,
      category,
      description,
      github: github || '',
      tech,
      image: coverPath,
      gallery: galleryPaths.length > 0 ? galleryPaths : [coverPath],
    };

    projects.unshift(newProject);

    // Update projects.json
    const updatedContent = Buffer.from(JSON.stringify(projects, null, 2)).toString('base64');
    await githubApi(`/repos/${OWNER}/${REPO}/contents/src/data/projects.json`, 'PUT', {
      message: `Add project: ${name} (ID ${nextId})`,
      content: updatedContent,
      sha,
      branch: BRANCH,
    });

    return NextResponse.json({ 
      success: true, 
      project: newProject,
      message: `Project "${name}" added successfully! Vercel will deploy automatically.`
    });
  } catch (error) {
    console.error('Admin API error:', error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
