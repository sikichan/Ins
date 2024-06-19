import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { SignUpValidation } from '@/lib/validation';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, Button, useToast } from '@/components/ui';
import { Loader } from '@/components/shared';
import { Link, useNavigate } from 'react-router-dom';
import { useCreateAccountMutation, useSignInMutation } from '@/lib/react-query';
import { useAuthContext } from '@/context/AuthContext.tsx';

const SignUpForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { checkAuthUser } = useAuthContext();
  const { mutateAsync: createAccount, isPending: isSigning } = useCreateAccountMutation();
  const { mutateAsync: signInAccount, isPending: isLogging } = useSignInMutation();
  const form = useForm<z.infer<typeof SignUpValidation>>({
    resolver: zodResolver(SignUpValidation),
    defaultValues: {
      name: '',
      username: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof SignUpValidation>) => {
    await createAccount(values);
    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });
    if (!session) {
      return toast({
        title: 'Sign Up Failed, Please Try Again Later',
      });
    }
    const isLoggedIn = await checkAuthUser();
    if (isLoggedIn) {
      form.reset();
      localStorage.setItem('ins-session', session.$id);
      navigate('/');
    } else {
      toast({
        title: 'Sign Up Failed, Please Try Again Later',
      });
    }
  };

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <div className="flex justify-center items-center gap-2">
          <img src="/assets/logo.png" className="w-10 h-10" alt="logo" />
          <span>Instagram C</span>
        </div>
        <h1 className="h3-bold md:h2-bold pt-5 sm:pt-12">Create a new account</h1>
        <p className="text-light-3 small-medium md:base-regular">To use Instagram C please enter your details</p>

        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input type="text" {...field} className="shad-input" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" {...field} className="shad-input" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} className="shad-input" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} className="shad-input" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isSigning || isLogging} type="submit" className="shad-button_primary">
            {(isSigning || isLogging) && <Loader />} Sign Up
          </Button>
          <p className="text-small-regular text-light-2 text-center mt-2">
            Already have an account ?
            <Link className="text-primary ml-1" to={'/sign-in'}>
              Log in
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};
export default SignUpForm;
