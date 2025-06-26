// This is a mock implementation of the TaskVibe API client

export async function verifyApiKey(apiKey: string): Promise<boolean> {
  // In a real implementation, this would make an actual API call
  // For demo purposes, we'll just simulate a successful response
  console.log("Verifying API key with TaskVibe:", apiKey);

  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // For demo purposes, any key that starts with "tv_" is considered valid
  return apiKey.startsWith("tv_");
}

type TypeDefinition = {
  typeName: string;
  label: string;
  description: string;
};

export async function getTypeDefinitions(
  apiKey: string,
): Promise<TypeDefinition[]> {
  // In a real implementation, this would make an actual API call
  // We also would not be logging the API key
  console.log("Fetching type definitions from TaskVibe with API key:", apiKey);

  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Return mock type definitions
  return [
    {
      typeName: "task",
      label: "Task",
      description: "A task is a unit of work that needs to be completed.",
    },
    {
      typeName: "project",
      label: "Project",
      description:
        "A project is a collection of tasks that need to be completed.",
    },
  ];
}
