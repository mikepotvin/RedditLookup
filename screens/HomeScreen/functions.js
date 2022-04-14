import axios from 'axios';
const colors = ['#B28DFF', '#85E3FF', '#BFFCC6', '#AFCBFF'];
let colorIndex = 0;
function getColor() {
  return colors[Math.floor(colorIndex++ % (colors.length - 1))];
}

function matchOrNew(totals, name) {
  const match = totals.find((x) => x.name === name);
  if (match) {
    match.total += 1;
  } else {
    totals.push({
      name: name,
      total: 1,
      color: getColor(),
    });
  }
}

function getSubredditTotals(result) {
  const totals = [];
  const children = result.data.data.children;
  children.forEach((child) => {
    const subreddit = child.data.subreddit;
    matchOrNew(totals, subreddit);
  });
  return totals;
}

function decorate(totals) {
  const sum = totals.reduce((total, item) => {
    if (total.total) {
      return total.total + item.total;
    } else {
      return total + item.total;
    }
  });

  return totals.map((x) => {
    const percent = Math.floor((x.total / sum) * 100);
    return {
      ...x,
      percent: percent,
    };
  });
}

export async function loadAllSubreddits(username, onTotalsUpdated) {
  let result = await axios.get(
    `https://www.reddit.com/user/${username}/comments.json?limit=100`,
  );

  const totals = getSubredditTotals(result);
  onTotalsUpdated(decorate(totals));
  while (result.data.data.after && result.data.data.after.length > 0) {
    result = await axios.get(
      `https://www.reddit.com/user/${username}/comments.json?limit=100&after=${result.data.data.after}`,
    );
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const newTotals = getSubredditTotals(result);
    newTotals.forEach((x) => {
      matchOrNew(totals, x.name);
    });
    onTotalsUpdated(decorate(totals));
  }
}

export function getHeaderStartY(screenHeight, headerHeight) {
  return screenHeight / 2 - headerHeight / 2;
}

export function getHeaderStartX(screenWidth, headerWidth) {
  return screenWidth / 2 - headerWidth / 2;
}
