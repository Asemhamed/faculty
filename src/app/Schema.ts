import * as z from "zod"

export const RegisterSchema = z.object({
        name: z.string().nonempty('Name is required').min(2, "Name must be at least 2 characters long").max(15, "Name must be at most 15 characters long"),
        email: z.email('Invalid email address').nonempty('Email is required'),
        password: z.string().nonempty('Password is required'),//.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])(?=\S+$).{8,}$/, "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character"),
        rePassword: z.string().nonempty('Re-enter Password is required'),
        phone: z.string().regex(/^01[0125]\d{8}$/, "Phone number must be a valid Egyptian phone number").nonempty('Phone number is required'),
        terms:z.boolean().refine((value)=> value == true,{
            error:'you must accept the terms and conditions'
        })
    }
    ).refine((obj)=>obj.password === obj.rePassword, {
        message: "Passwords don't match",
        path: ["rePassword"]
    });

    export const LoginSchema = z.object({
        email: z.email('Invalid email address').nonempty('Email is required'),
        password: z.string().nonempty('Password is required'),
    }
    );

    export const ForgetSchema = z.object({
        email: z.email('Invalid email address').nonempty('Email is required'),
}
    );

    export const VerifyResetCodeSchema = z.object({
        resetCode: z.string().nonempty('Reset code is required'),
}
    );
    export const ResetPasswordSchema = z.object({
        email: z.email('Invalid email address').nonempty('Email is required'),
        newPassword: z.string().nonempty('New password is required').regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])(?=\S+$).{8,}$/, "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character"),
}
    );


    export type RegisterType = z.infer<typeof RegisterSchema>
    export type LoginType = z.infer<typeof LoginSchema>
    export type ForgetType = z.infer<typeof ForgetSchema>
    export type VerifyResetCodeType = z.infer<typeof VerifyResetCodeSchema>
    export type ResetPasswordType = z.infer<typeof ResetPasswordSchema>