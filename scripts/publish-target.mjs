export function isBlogRemote(remote) {
  return /^(?:git@github\.com:|https:\/\/github\.com\/|ssh:\/\/git@github\.com\/)rxustrong\/rxustrong\.github\.io(?:\.git)?$/.test(remote);
}
