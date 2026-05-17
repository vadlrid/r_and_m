type Parameter = string | Record<string, boolean | undefined> | Parameter[];

export function classNames(...params: Parameter[]): string {
  const classes: string[] = [];

  while (params.length) {
    const param = params.shift();
    if (!param) {
      continue;
    }

    if (typeof param === 'string') {
      classes.push(param);
      continue;
    }

    if (param instanceof Array) {
      params.unshift(...param);
      continue;
    }

    const appliedClasses = Object.entries(param)
      .filter(([, isApplied]) => !!isApplied)
      .map(([className]) => className);

    classes.push(...appliedClasses);
  }
  return classes.join(' ');
}
