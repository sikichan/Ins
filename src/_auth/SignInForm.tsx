import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { LoginValidation } from '@/lib/validation';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, Button, useToast } from '@/components/ui';
import { Loader } from '@/components/shared';
import { Link, useNavigate } from 'react-router-dom';
import { useSignInMutation } from '@/lib/react-query';
import { useAuthContext } from '@/context/AuthContext.tsx';

const SignInForm = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { checkAuthUser, isLoading } = useAuthContext();
  const { mutateAsync: signInAccount, isPending: isLogging } = useSignInMutation();
  const form = useForm<z.infer<typeof LoginValidation>>({
    resolver: zodResolver(LoginValidation),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof LoginValidation>) => {
    const session = await signInAccount({
      email: values.email,
      password: values.password,
    });
    if (!session) {
      return toast({
        variant: 'destructive',
        title: 'Log In Failed, Please Check Your Email and Password',
      });
    }
    const isLoggedIn = await checkAuthUser();
    if (isLoggedIn) {
      form.reset();
      navigate('/');
    } else {
      toast({
        variant: 'destructive',
        description: 'Log In Failed, Please Try Again Later',
      });
    }
  };

  return (
    <Form {...form}>
      <div className="sm:w-420 flex-center flex-col">
        <div className="flex justify-center items-center gap-2">
          <img src="/assets/logo.png" className="w-10 h-10" alt="logo" />
          <span>InstagramClone</span>
        </div>
        <h1 className="h3-bold md:h2-bold pt-5 sm:pt-12">Log in an account</h1>
        <p className="small-medium md:base-regular">To use InstagramClone please enter your details</p>

        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full mt-4">
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
          <Button disabled={isLogging || isLoading} type="submit" className="shad-button_primary">
            {(isLogging || isLoading) && <Loader />} Log In
          </Button>
          <p className="text-light-3 text-center mt-2">
            Do not have an account ?
            <Link className="text-primary ml-1" to={'/sign-up'}>
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};
export default SignInForm;
