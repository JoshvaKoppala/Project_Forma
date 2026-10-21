import { CONFIG } from '../config/config';

const postQuery = async (url, query) => {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  });

  const answer = await response.text();

  if (!response.ok) {
    throw new Error(answer || `AI request failed (Status: ${response.status})`);
  }

  return answer;
};

export const aiAgentService = {
  askWithContext: (query) => postQuery(CONFIG.AI_AGENT_URL, query),
  askDirectly: (query) => postQuery(CONFIG.AI_AGENT_DIRECT_URL, query),
};
