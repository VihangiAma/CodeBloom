import Swal from "sweetalert2";

export const confirmAction = async ({ title, text, confirmButtonText }) => {
  const result = await Swal.fire({
    title: title || "Are you sure?",
    text: text || "You won't be able to undo this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#B30000",
    cancelButtonColor: "#999999",
    confirmButtonText: confirmButtonText || "Yes, proceed",
  });

  return result.isConfirmed;
};
