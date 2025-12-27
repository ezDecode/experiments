import { notFound } from "next/navigation";
import { resolveComponent, getAllComponentsMetadata } from "@/lib/registry/resolver";
import { getComponentSourceCode } from "@/lib/registry-server";
import { CodeBlock } from "@/components/code/CodeBlock";
import { DemoContainer } from "@/components/lab/DemoContainer";

interface ComponentPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const components = getAllComponentsMetadata();
  return components.map((component) => ({
    slug: component.id,
  }));
}

export default async function ComponentPage({ params }: ComponentPageProps) {
  const { slug } = await params;

  let Component;
  let metadata;

  try {
    const resolved = await resolveComponent(slug);
    Component = resolved.Component;
    metadata = resolved.metadata;
  } catch (error) {
    console.error(`Failed to resolve component "${slug}":`, error);
    notFound();
  }

  const sourceCode = getComponentSourceCode(slug);

  return (
    <article>
      <header className="flex flex-col gap-3 mb-12">
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-semibold leading-none tracking-tight text-foreground">
            {metadata.title}
          </h1>
          <div className="text-sm text-muted-foreground">December 2025</div>
        </div>
        <p className="text-base text-muted-foreground leading-relaxed max-w-2xl">
          {metadata.description}
        </p>
      </header>

      <section id="demo" className="mb-12">
        {metadata.demo.variants && metadata.demo.variants.length > 1 ? (
          <div className="flex flex-col gap-6">
            {metadata.demo.variants.map((variant) => (
              <div key={variant} className="flex flex-col gap-2">
                <div className="text-sm font-medium text-muted-foreground capitalize px-1">
                  {variant}
                </div>
                <DemoContainer design={metadata.design} padding="lg">
                  <div className="min-h-80 w-full flex items-center justify-center">
                    <Component {...metadata.demo.defaultProps} variant={variant} />
                  </div>
                </DemoContainer>
              </div>
            ))}
          </div>
        ) : (
          <DemoContainer design={metadata.design} padding="lg">
            <div className="min-h-80 w-full flex items-center justify-center">
              <Component {...metadata.demo.defaultProps} />
            </div>
          </DemoContainer>
        )}
      </section>

      <section id="demo-code" className="flex flex-col gap-3 mb-12">
        <h2 className="text-lg font-medium tracking-tight">Demo Code</h2>
        {sourceCode.demo && (
          <CodeBlock
            code={sourceCode.demo.code}
            language="tsx"
            filename={sourceCode.demo.filename}
          />
        )}
      </section>

      {sourceCode.primitive && (
        <section id="primitive-code" className="flex flex-col gap-3 mb-12">
          <h2 className="text-lg font-medium tracking-tight">Primitive Code</h2>
          <CodeBlock
            code={sourceCode.primitive.code}
            language="tsx"
            filename={sourceCode.primitive.filename}
          />
        </section>
      )}

      {metadata.readme && (
        <section id="docs" className="scroll-mt-20 flex flex-col gap-4">
          <h2 className="text-lg font-medium tracking-tight">Details</h2>
          <div className="text-base leading-relaxed text-muted-foreground max-w-2xl">
            <p>{metadata.readme}</p>
          </div>

          {metadata.dependencies && metadata.dependencies.length > 0 && (
            <div className="flex flex-col gap-2">
              <h3 className="text-sm font-medium text-muted-foreground">Dependencies</h3>
              <div className="flex flex-wrap gap-2">
                {metadata.dependencies.map((dep) => (
                  <code
                    key={dep}
                    className="inline-flex px-2.5 py-1.5 rounded text-xs bg-muted text-muted-foreground font-mono border border-border"
                  >
                    {dep}
                  </code>
                ))}
              </div>
            </div>
          )}
        </section>
      )}
    </article>
  );
}
