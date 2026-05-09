import { checkoutSchema } from "@/lib/validations/auth";

type CheckOutFormState = {
  errors: {
    fullName?: string[];
    phone?: string[];
    email?: string[];
    address?: string[];
    city?: string[];
    area?: string[];
    orderNotes?: string[];
    promocode?: string[];
  } | null;
  enteredValues?: {
    fullName?: FormDataEntryValue | null;
    phone?: FormDataEntryValue | null;
    email?: FormDataEntryValue | null;
    address?: FormDataEntryValue | null;
    city?: FormDataEntryValue | null;
    area?: FormDataEntryValue | null;
    orderNotes?: FormDataEntryValue | null;
    promocode?: FormDataEntryValue | null;
  };
  message?: string;
  success?: boolean;
};

export function checkOutAction(
  prevFormState: CheckOutFormState,
  formData: FormData,
) {
  const fullName = formData.get("fullName");
  const phone = formData.get("phone");
  const email = formData.get("email");
  const address = formData.get("address");
  const city = formData.get("city");
  const area = formData.get("area");
  const orderNotes = formData.get("orderNotes");
  const promocode = formData.get("promocode");

  const result = checkoutSchema.safeParse({
    fullName,
    phone,
    email,
    address,
    city,
    area,
    orderNotes,
    promocode,
  });
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
      enteredValues: {
        fullName,
        phone,
        email,
        address,
        city,
        area,
        orderNotes,
        promocode,
      },
      success: false,
    };
  }

  alert(
    JSON.stringify(
      {
        fullName,
        phone,
        email,
        address,
        city,
        area,
        orderNotes,
        promocode,
        success: true,
      },
      null,
      2,
    ),
  );
}
