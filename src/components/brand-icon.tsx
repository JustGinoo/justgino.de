type Props = {
  name: string;
  themed?: boolean;
  size?: number;
  className?: string;
};

export function BrandIcon({ name, themed, size = 32, className }: Props) {
  return (
    <picture className={className}>
      {themed && <source srcSet={`/icons/${name}-light.svg`} media="(prefers-color-scheme: dark)" />}
      <img src={`/icons/${name}.svg`} alt="" width={size} height={size} loading="lazy" decoding="async" />
    </picture>
  );
}
