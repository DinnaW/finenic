export function domainSuggestions(input) {
  let value = input.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/$/, '')
  if (!value) throw new Error('Enter a name or domain to get started.')
  if (value.length > 253 || !/^[a-z0-9.-]+$/.test(value)) throw new Error('Use letters, numbers, and hyphens — for example, yourbigidea.com.')
  const labels = value.split('.')
  if (labels.some(label => !label || label.length > 63 || label.startsWith('-') || label.endsWith('-'))) throw new Error('Enter a valid domain without spaces or a hyphen at the start or end.')
  if (labels.length > 1 && !/^[a-z]{2,63}$/.test(labels.at(-1))) throw new Error('Add a valid extension, such as .com or .io.')
  const stem = labels[0]
  return [...new Set([labels.length > 1 ? value : `${stem}.com`, `${stem}.com`, `${stem}.io`, `${stem}.co`, `${stem}.net`])].slice(0,4)
}
