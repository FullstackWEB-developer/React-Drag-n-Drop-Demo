let itemPosition = 'active list';
let observer = null;

export function observe(o) {
  observer = o;
  observer(itemPosition);
}

export function moveItem(team) {
  itemPosition = team;
  observer(itemPosition);
}
