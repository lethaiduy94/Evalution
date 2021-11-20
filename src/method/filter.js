export function compare(a, b) {
    const bandA = a.id;
    const bandB = b.id;
    
    let comparison = 0;
    if (bandA > bandB) {
      comparison = -1;
    } else if (bandA < bandB) {
      comparison = 1;
    }
    return comparison;
  }