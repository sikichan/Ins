import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button, Form, FormControl, FormField, FormItem, FormLabel, FormMessage, Input, Textarea } from '@/components/ui';
import { FileUploader } from '@/components/shared';
import { PostValidation } from '@/lib/validation';
import { Models } from 'appwrite';
import { useCreatePost } from '@/lib/react-query';
import { useAuthContext } from '@/context/AuthContext.tsx';
import { useToast } from '@/components/ui';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export type PostFormProps = {
  post?: Models.Document;
};
const PostForm = ({ post }: PostFormProps) => {
  const { mutateAsync: createPost, isPending } = useCreatePost();
  const { user } = useAuthContext();
  const { toast } = useToast();
  const { t } = useTranslation();

  const navigate = useNavigate();
  const form = useForm<z.infer<typeof PostValidation>>({
    resolver: zodResolver(PostValidation),
    defaultValues: {
      caption: post ? post.caption : '',
      file: [],
      location: post ? post.location : '',
      tags: post ? post.tags.join(',') : '',
    },
  });
  const onSubmit = async (values: z.infer<typeof PostValidation>) => {
    console.log(values);
    const newPost = await createPost({ ...values, userId: user.id });
    if (!newPost) {
      return toast({ title: 'Please Try Again Later' });
    }
    navigate('/');
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-5 w-full max-w-5xl">
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('create.caption')}</FormLabel>
              <FormControl>
                <Textarea className="custom-scrollbar h-[100px]" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('create.addphotos')}</FormLabel>
              <FormControl>
                <FileUploader fieldChange={field.onChange} mediaUrl={post?.imageUrl} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t('create.addlocation')}</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t('create.addtags')} ({t('tagdesc')})
              </FormLabel>
              <FormControl>
                <Input type="text" placeholder="Javascript,React,Vue" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4 justify-end">
          <Button type="button" variant="outline" onClick={() => navigate(-1)}>
            {t('cancel')}
          </Button>
          <Button type="submit" disabled={isPending}>
            {t('submit')}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PostForm;
