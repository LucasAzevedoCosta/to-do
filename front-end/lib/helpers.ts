export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
};

export const appUrl =
  process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
