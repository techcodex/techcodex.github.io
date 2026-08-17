import { Download } from "lucide-react";
import { contentService } from "../services/contentService";
import { useContent } from "../hooks/useContent";
import { SectionContainer } from "../components/layout/SectionContainer";
import { FadeInSection } from "../components/ui/FadeInSection";

export function ResumePage() {
  const { data: resume, loading } = useContent(() => contentService.getResumeMeta());

  return (
    <SectionContainer id="resume" title="Resume">
      {loading || !resume ? (
        <div className="h-40" />
      ) : (
        <FadeInSection>
          <div className="mb-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-ink-soft">Last updated {resume.updatedAt}</p>
            <a
              href={resume.fileUrl}
              download
              className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-5 py-2.5 text-sm font-medium text-paper transition-opacity hover:opacity-90"
            >
              <Download size={16} />
              Download PDF
            </a>
          </div>
          {/* Intentionally literal white, not a theme token: this is a real
              white PDF page sitting in a "paper on a dark desk" card. */}
          <div className="overflow-hidden rounded-2xl border border-border bg-white shadow-2xl shadow-black/40">
            <embed src={resume.fileUrl} type="application/pdf" className="h-[600px] w-full" />
          </div>
        </FadeInSection>
      )}
    </SectionContainer>
  );
}
